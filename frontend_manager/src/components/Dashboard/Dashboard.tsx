import React, { useEffect } from "react";
import Wrapper from "../Wrapper";
import c3 from "c3";
import axios from "axios";


export default function Dashboard() {

    useEffect(() => {
        const fetchData = async () => {

            var chart = c3.generate({
                bindto: '#chart',
                data: {
                  x:'x',
                  columns: [
                    ['x'],
                    ['Sales']
                  ],
                  types: {
                    Sales: 'bar'
                  }
                },
                axis: {
                  x: {
                    type: 'timeseries',
                    tick: {
                        format: '%d-%m-%Y'
                    }
                  }
                }
            });

                const token = localStorage.getItem("token")
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await axios.get(
                    'chart',
                    config
                )

                const information: {date:string, sum:number}[] = data.data;

                chart.load({
                  columns: [
                    ['x', ...information.map(r =>  new Date(r.date))],
                    ['Sales', ...information.map(r => r.sum)]
                  ]
                })

        };
        fetchData();
      }, [])

      return (
        <Wrapper>
            <h2>Sales</h2>
            <div id="chart"></div>
        </Wrapper>
      )
    }
