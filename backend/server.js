require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 8000;

const SECRET_KEY = process.env.SECRET_KEY;
const MONGODB_URI = process.env.MONGODB_URI;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

async function run() {
    try {
        const client = new MongoClient(MONGODB_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        await client.connect();
        console.log("MongoDB'ye başarıyla bağlandı");

        app.listen(PORT, () => {
            console.log(`Express.js backend server is running on port ${PORT}`);
        });

        app.post('/login', jsonParser, async (req, res) => {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(200).json({ message: 'Kullanıcı adı ve şifre boş bırakılamaz!' });
            }

            const user = await client.db("TiyatroApp").collection("users").findOne({ username, password });

            if (user) { 
                const token = jwt.sign({ username: user.username }, SECRET_KEY, {
                    expiresIn: '1d' // bir gün
                });

                return res.status(200).json({ 
                    message: 'Giriş başarılı!',
                    user: { username: username },
                    token: token
                });
            } else {
                return res.status(200).json({ message: 'Yanlış kullanıcı adı veya şifre girdiniz!' });
            }
        });

        app.post('/register', jsonParser , async (req, res) => {
            const { username, email, password, confirmPassword } = req.body;

            if (!username || !email || !password || !confirmPassword) {
                return res.status(400).json({ message: 'Kullanıcı adı, email, şifre ve şifre tekrarı gerekli!' });
            }

            const existingUser = await client.db("TiyatroApp").collection("users").findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: 'Böyle bir kullanıcı zaten mevcut!' });
            }

            await client.db("TiyatroApp").collection("users").insertOne({ username, password, email });

            res.status(201).json({ message: 'Kayıt başarılı!' });
        });

        app.post('/getUserInfo', jsonParser, async (req, res) => {
            const { username } = req.body;
            const user = await client.db("TiyatroApp").collection("users").findOne({ username });
            const reservations = await client.db("TiyatroApp").collection("reservations").find({ username })
                .project({ _id: 0, playName: 1, playDate: 1, seatNumber: 1, ticketType: 1, ticketPrice: 1, referenceNumber: 1, purchaseDate: 1 }).toArray();

            if (user) { 
                return res.status(200).json({ 
                    user: { username: user.username },
                    email: { email: user.email },
                    reservations: reservations,
                });
            }
        });

        app.post('/saveSeatNumbers', jsonParser, async (req, res) => {
            const { username, playName, selectedSeats, normalTicket, studentTicket } = req.body;
            const purchaseDate = new Date();
            purchaseDate.setDate(purchaseDate.getDate() + 10);
            purchaseDate.setHours(20, 0, 0, 0);
            const playDate = purchaseDate.toLocaleString('tr-TR');

            const user = await client.db("TiyatroApp").collection("users").findOne({ username });
            const email = user.email;

            const ticketInfoArray = [];
            let normalTicketCount = parseInt(normalTicket);
            let studentTicketCount = parseInt(studentTicket);

            for (const seatNumber of selectedSeats) {
                const referenceNumber = generateReferenceNumber();
                let ticketType;
                let ticketPrice;

                if (normalTicketCount > 0) {
                    ticketType = 'Tam';
                    ticketPrice = "50";
                    normalTicketCount--;
                } else if (studentTicketCount > 0) {
                    ticketType = 'Öğrenci';
                    ticketPrice = "30";
                    studentTicketCount--;
                } else {
                    ticketType = 'Tam';
                    ticketPrice = "50";
                }

                ticketInfoArray.push(`Oyun: ${playName}\nOyun Tarihi: ${playDate}\nKoltuk Numarası: ${seatNumber}\nBilet Türü: ${ticketType}\nBilet Fiyatı: ${ticketPrice} TL\nReferans Kodu: ${referenceNumber}\n ------ \n`);
            }

            const emailText = `Merhaba ${username},\n\n${playName} oyununa aldığınız biletlerin bilgisi aşağıdadır. İyi seyirler dileriz!\n\n${ticketInfoArray.join('\n')} `;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASS
                }
            });

            const mailOptions = {
                from: 'theatremate@gmail.com', 
                to: email,
                subject: 'Bilet Bilgileri',
                text: emailText 
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('E-posta gönderildi:', info.response);
            res.send('E-posta gönderildi, bilet bilgileri e-posta adresinize gönderildi.');

            for (const seatNumber of selectedSeats) {
                const referenceNumber = generateReferenceNumber();
                let ticketType;
                let ticketPrice;

                if (normalTicketCount > 0) {
                    ticketType = 'Tam';
                    ticketPrice = "50";
                    normalTicketCount--;
                } else if (studentTicketCount > 0) {
                    ticketType = 'Öğrenci';
                    ticketPrice = "30";
                    studentTicketCount--;
                } else {
                    ticketType = 'Tam';
                    ticketPrice = "50";
                }

                await client.db("TiyatroApp").collection("reservations").insertOne({ username, playName, playDate, seatNumber, ticketType, ticketPrice, referenceNumber, purchaseDate });
            }
        });

        app.post('/getOccupiedSeats', jsonParser, async (req, res) => {
            const { playName } = req.body;

            const occupiedSeats = await client.db("TiyatroApp").collection("reservations").find({ playName }).toArray();
            const seatNumbers = occupiedSeats.map(seat => seat.seatNumber);

            return res.status(200).json({
                occupiedSeats: seatNumbers
            });
        });

        function generateReferenceNumber() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890123456789';
            let referenceNumber = '';
            for (let i = 0; i < 6; i++) {
                referenceNumber += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return referenceNumber;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

run().catch(console.dir);
