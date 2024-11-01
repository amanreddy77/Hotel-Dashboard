import  { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Papa from 'papaparse';
import '../App.css';

const Dashboard = () => {
    const [chartData, setChartData] = useState<{
        timeSeries: any;
        countryChart: any;
        adultSparkline: any;
        childSparkline: any;
    }>({
        timeSeries: { series: [], options: {} },
        countryChart: { series: [], options: {} },
        adultSparkline: { series: [], options: {} },
        childSparkline: { series: [], options: {} },
    });

    const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
        start: '',
        end: '',
    });

    const [originalData, setOriginalData] = useState<any[]>([]);

    useEffect(() => {
        // Fetching CSV data
        fetch('/hotel_bookings_1000.csv')
            .then((response) => response.text())
            .then((data) => {
                Papa.parse(data, {
                    header: true,
                    complete: (results) => {
                        setOriginalData(results.data);
                        updateChartData(results.data);
                    },
                });
            })
            .catch((error) => {
                console.error('Error fetching CSV data:', error);
            });
    }, []);

    const updateChartData = (data: any[]) => {
        const arrivalsByDate: { [key: string]: number } = {};
        const arrivalsByCountry: { [key: string]: number } = {};
        const adultVisitors: { [key: string]: number } = {};
        const childVisitors: { [key: string]: number } = {};

        data.forEach((row) => {
            const date = `${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`;
            const country = row.country;
            const adults = parseInt(row.adults, 10) || 0;
            const children = parseInt(row.children, 10) || 0;
            const babies = parseInt(row.babies, 10) || 0;
            const totalGuests = adults + children + babies;

            // Aggregate arrivals by date
            arrivalsByDate[date] = (arrivalsByDate[date] || 0) + totalGuests;

            // Aggregate arrivals by country
            arrivalsByCountry[country] = (arrivalsByCountry[country] || 0) + totalGuests;

            // Aggregate adult and child visitors for sparklines
            adultVisitors[date] = (adultVisitors[date] || 0) + adults;
            childVisitors[date] = (childVisitors[date] || 0) + children;
        });

        // data for the time series chart
        const dates = Object.keys(arrivalsByDate);
        const timeSeriesData = Object.values(arrivalsByDate);

        // Data for the country chart
        const countries = Object.keys(arrivalsByCountry);
        const countryArrivals = Object.values(arrivalsByCountry);

        // Data for adult and child sparklines
        const adultData = Object.values(adultVisitors);
        const childData = Object.values(childVisitors);

        // Setting chart configurations
        setChartData({
            timeSeries: {
                series: [{
                    name: 'Total Visitors',
                    data: timeSeriesData,
                }],
                options: {
                    chart: {
                        type: 'line',
                        zoom: {
                            enabled: true,
                        },
                    },
                    title: {
                        text: 'Number of Visitors Per Day',
                    },
                    xaxis: {
                        categories: dates,
                        title: {
                            text: 'Date',
                        },
                    },
                    yaxis: {
                        title: {
                            text: 'Total Visitors',
                        },
                    },
                },
            },
            countryChart: {
                series: [{
                    name: 'Visitors',
                    data: countryArrivals,
                }],
                options: {
                    chart: {
                        type: 'bar',
                        height: 400,
                    },
                    title: {
                        text: 'Visitors Per Country',
                    },
                    xaxis: {
                        categories: countries,
                    },
                    yaxis: {
                        title: {
                            text: 'Total Visitors',
                        },
                    },
                },
            },
            adultSparkline: {
                series: [{
                    name: 'Adult Visitors',
                    data: adultData,
                }],
                options: {
                    chart: {
                        type: 'line',
                        sparkline: {
                            enabled: true,
                        },
                    },
                    title: {
                        text: 'Total Adult Visitors',
                        align: 'left',
                    },
                    yaxis: {
                        show: false,
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 2,
                    },
                    markers: {
                        size: 0,
                    },
                },
            },
            childSparkline: {
                series: [{
                    name: 'Child Visitors',
                    data: childData,
                }],
                options: {
                    chart: {
                        type: 'line',
                        sparkline: {
                            enabled: true,
                        },
                    },
                    title: {
                        text: 'Total Child Visitors',
                        align: 'left',
                    },
                    yaxis: {
                        show: false,
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 2,
                    },
                    markers: {
                        size: 0,
                    },
                },
            },
        });
    };

    const handleDateRangeChange = () => {
        if (!dateRange.start || !dateRange.end) {
            alert('Please select both start and end dates.');
            return;
        }
            // string conversion of dates
        const startDate = new Date(dateRange.start);
        const endDate = new Date(dateRange.end);

        const filteredData = originalData.filter((row) => {
            const rowDate = new Date(`${row.arrival_date_year}-${row.arrival_date_month}-${row.arrival_date_day_of_month}`);
            return rowDate >= startDate && rowDate <= endDate;
        });

        // Check if the filtered data is empty
        if (filteredData.length === 0) {
            alert('No data found for the selected date range.');
        } else {
            updateChartData(filteredData);
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Hotel Booking Dashboard</h1>
            <div className="date-range-filter">
                <label>
                    Start Date:
                    <input
                        type="date"
                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                        className="date-input"
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                        className="date-input"
                    />
                </label>
                <button onClick={handleDateRangeChange} className="filter-button">Filter</button>
            </div>
            <div className="chart-section">
                <h2 className="chart-title">Time Series Chart</h2>
                <Chart
                    options={chartData.timeSeries.options}
                    series={chartData.timeSeries.series}
                    type="line"
                    height={350}
                />
            </div>
            <div className="chart-section">
                <h2 className="chart-title">Country Chart</h2>
                <Chart
                    options={chartData.countryChart.options}
                    series={chartData.countryChart.series}
                    type="bar"
                    height={450}
                />
            </div>
            <div className="sparkline-section">
                <h2 className="sparkline-title">Adult Sparkline</h2>
                <Chart
                    options={chartData.adultSparkline.options}
                    series={chartData.adultSparkline.series}
                    type="line"
                    height={200}
                />
            </div>
            <div className="sparkline-section">
                <h2 className="sparkline-title">Child Sparkline</h2>
                <Chart
                    options={chartData.childSparkline.options}
                    series={chartData.childSparkline.series}
                    type="line"
                    height={200}
                />
            </div>
        </div>
    );
};

export default Dashboard;
