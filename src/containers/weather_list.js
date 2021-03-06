import React, {Component} from 'react';
import {connect} from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';


class WeatherList extends Component{

    renderWeather(cityData){
        const name = cityData.city.name;
        const temp = cityData.list.map(weather => weather.main.temp-273,15);
        const pressure = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);

        const{lon, lat} = cityData.city.coord;
        return(
            <tr key = {name}>
                <td ><GoogleMap lat={lat} lon={lon}/></td>
                <td>
                    <Chart data = {temp} color = {'red'} units = 'C'/>
                </td>
                <td>
                    <Chart data = {pressure} color = {'green'}/>
                </td>
                <td>
                    <Chart data = {humidities} color = {'blue'}/>
                </td>


            </tr>
        )
    }
    render(){
        return(
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature, C</th>
                    <th>Pressure, hPa</th>
                    <th>Humidity, %</th>
                </tr>
                </thead>
                <tbody>

                        {this.props.weather.map(this.renderWeather)}

                </tbody>

            </table>
        )
    }
}


function mapStateToProps({weather}) {
    return {weather};
}
export default connect(mapStateToProps)(WeatherList);