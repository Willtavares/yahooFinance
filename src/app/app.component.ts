import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Stock } from './model/stock.model';
import { IndicatorsService } from './service/indicators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yahooFinance';

  dataStock?: Stock;

  dataResponse: any;

  timestamp: any;
  open: any;
  close: any;
  volume: any;
  variations: Array<any> = [];
  timeStamp: Array<any> = [];

  data1 = [12, 19, 3, 5, 2, 3];

  constructor(private service: IndicatorsService) {}

  ngOnInit(): void {
    this.getStocks();
  }

  getStocks(): void {
    this.service.getData().subscribe((response) => {
      this.dataResponse = response;
      if (this.dataResponse?.chart?.result[0]) {
        this.dataStock = this.dataResponse?.chart?.result[0];

        this.timestamp = this.dataStock?.timestamp?.slice(-30);
        this.open = this.dataStock?.indicators?.quote[0].open.slice(-30);
        this.close = this.dataStock?.indicators?.quote[0].close.slice(-30);
        this.volume = this.dataStock?.indicators?.quote[0].volume.slice(-30);

        for (let index = 0; index < this.timestamp.length; index++) {
          const element = new Date(this.timestamp[index]).toLocaleDateString(
            'PT-BR'
          );
          this.timeStamp.push(element);
        }

        let result;
        for (let index = 0; index < this.open.length; index++) {
          if (this.open[index] > this.close[index]) {
            console.log('Maior');
            result =
              ((this.open[index] - this.close[index]) * 100) / this.open[index];
            this.variations.push(Math.round(result));
          } else {
            console.log('Menor');
            result =
              ((this.open[index] - this.close[index]) * 100) /
              this.close[index];
            this.variations.push(Math.round(result));
          }
        }

        var myChart = new Chart('myChart', {
          type: 'line',
          data: {
            labels: this.timeStamp,
            datasets: [
              {
                label: 'Variations',
                data: this.variations,
                fill: false,
                lineTension: 0.1,
                borderWidth: 3,
                backgroundColor: '#0196FD',
                borderColor: '#0196FD',
                type: 'line',
              },
              // {
              //   label: 'Open',
              //   data: this.open,
              //   backgroundColor: '#1ab16b',
              //   borderColor: '#0f8261 ',
              //   borderWidth: 1,
              // },
              // {
              //   label: 'Close',
              //   data: this.close,
              //   backgroundColor: '#dd4649 ',
              //   borderColor: '#dd4649 ',
              //   borderWidth: 1,
              // },
            ],
          },
          options: {},
        });
      }
    });
  }
}
