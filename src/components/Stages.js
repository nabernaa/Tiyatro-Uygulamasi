import React from 'react';
import '../styles/Stages.css';
import harbiye from '../images/stages/harbiye.jpg';
import zorlu from '../images/stages/zorlu.jpg';
import kadikoy from '../images/stages/kadikoy.jpg';
import kucuk from '../images/stages/kucuk.jpg';
import opera from '../images/stages/opera.jpg';
import konak from '../images/stages/konak.jpg';
import edirne from '../images/stages/edirne.jpg';

export default function Stages() {
  return (
    <div>
        <h1 className='stage-h1'>Sahneler</h1>
        <div class="stage-row">
            <div class="stage-col">
                <img style={{float: 'left'}} src={harbiye} alt="Harbiye Muhsin Ertuğrul Sahnesi"/>
                <div className='stage-text'>
                    <h3>Harbiye Muhsin Ertuğrul Sahnesi</h3>
                    <p>İstanbul</p>
                </div>
            </div>
            <div class="stage-col">
                <img style={{float: 'right'}}  src={zorlu} alt="Zorlu Center PSM"/>
                <div className='stage-text'>
                    <h3>Zorlu Center PSM</h3>
                    <p>İstanbul</p>
                </div>
            </div>
            <div class="stage-col">
                <img style={{float: 'left'}}  src={kadikoy} alt="Kadıköy Haldun Taner Sahnesi"/>
                <div className='stage-text'>
                    <h3>Kadıköy Haldun Taner Sahnesi</h3>
                    <p>İstanbul</p>
                </div>

            </div>
            <div class="stage-col">
                <img style={{float: 'right'}} src={kucuk} alt="Ankara Küçük Tiyatro"/>
                <div className='stage-text'>
                    <h3>Ankara Küçük Tiyatro</h3>
                    <p>Ankara</p>
                </div>
            </div>
            <div class="stage-col">
                <img style={{float: 'left'}} src={opera} alt="Ankara Opera Sahnesi"/>
                <div className='stage-text'>
                    <h3>Ankara Opera Sahnesi</h3>
                    <p>Ankara</p>
                </div>
            </div>
            <div class="stage-col">
                <img style={{float: 'right'}}  src={konak} alt="İzmir Konak Sahnesi"/>
                <div className='stage-text'>
                    <h3>İzmir Konak Sahnesi</h3>
                    <p>İzmir</p>
                </div>
            </div>

            <div class="stage-col">
                <img style={{float: 'left'}} src={edirne} alt="Edirne Devlet Tiyatrosu"/>
                <div className='stage-text'>
                    <h3>Edirne Devlet Tiyatrosu</h3>
                    <p>Edirne</p>
                </div>
            </div>
        </div>
    </div>
  )
}
