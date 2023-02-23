import React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import soap from '../assests/soap.png';
import TX from '../assests/texas.png';
import car from '../assests/sedan.png';
import ML from '../assests/rora mini.png';
import { Divider } from 'antd';

function About() {
  return (
    <DefaultLayout>
        <div className='aboutBOX bxs p-2'>
            <div className="row">
                <div className='col-md-12'>
                    <img id="logimg" src={ML} width="225" />
                    <h6 className='text-center '><b>Go where the road may lead</b></h6>
                    <Divider/>
                </div>
            </div>
            <div className="row p-3 pb-5 pt-3 mt-2">
                <div className="col-md-4 mb-3">
                    <div className='abtIcon p-3'>
                        <img src={soap} width="100"/>
                        <Divider/>
                        <h5>Sanitized. Safe.</h5>
                        <p className='text-center'>Our cars are cleaned and sanitized before every rental in order to ensure the safety of our renters.</p>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className='abtIcon p-3'>
                        <img src={car} width="100"/>
                        <Divider/>
                        <h5>Exotic, Luxury And Economy.</h5>
                        <p className='text-center'>A Range of exotic, luxury, and economic vehicles are available to our customers to suit their trip needs.</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className='abtIcon p-3'>
                        <img src={TX} width="100"/>
                        <Divider/>
                        <h5>Servicing Central Texas.</h5>
                        <p className="text-center">We rent to anyone across the Cen-Tex area who is over the age of 21 and has Insurance. Our location is in Austin.</p>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default About