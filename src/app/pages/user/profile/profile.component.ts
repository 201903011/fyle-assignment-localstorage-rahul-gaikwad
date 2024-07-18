import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { Subject, takeUntil } from 'rxjs';
import { User, WorkOut } from 'src/app/models';
import { Chart } from 'src/app/models/chart.model';
import { LocalstorageService } from 'src/app/services';


@Component({
    standalone: true,
    imports: [CommonModule,],
    templateUrl: './profile.component.html',
})
export class ProfileComponent {
    @Input() userId!: string;

    private readonly _localStorageService = inject(LocalstorageService);

    private readonly _destroy$ = new Subject();

    user: User | null = null;


    ngOnInit(): void {

        this._localStorageService.userDataList$
            .pipe(takeUntil(this._destroy$))
            .subscribe((retList) => (retList.forEach(element => {
                if (element.id.toString() == this.userId) {
                    this.user = element;
                }
            })));
        const chart = new ApexCharts(document.getElementById('column-chart'), this.getOptions(this.user?.workouts ?? []));
        chart.render();
    }

    ngOnDestroy(): void {
        this._destroy$.complete();
        this._destroy$.unsubscribe();
    }

    getConcatenatedWorkOuts(workOuts: WorkOut[] | null): string {
        if (workOuts) {
            return workOuts?.map(e => e.type).join(', ');
        } else {
            return "";
        }

    }

    getTotalWorkOut(workOuts: WorkOut[] | null): string {
        if (workOuts) {
            return workOuts?.map(e => e.minutes).reduce((acc, num) => acc + num, 0).toString();
        } else {
            return "";
        }
    }

    getOptions(workOuts: WorkOut[]): any {
        const ret = workOuts.map(e => new Chart(e.type, e.minutes.toString()));

        const options = {
            colors: ["#1A56DB"],
            series: [
                {
                    name: "WorkOut",
                    color: "#1A56DB",
                    data: ret,
                },
            ],
            chart: {
                type: "bar",
                height: "320px",
                fontFamily: "Inter, sans-serif",
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "70%",
                    borderRadiusApplication: "end",
                    borderRadius: 8,
                },
            },
            tooltip: {
                shared: true,
                intersect: false,
                style: {
                    fontFamily: "Inter, sans-serif",
                },
            },
            states: {
                hover: {
                    filter: {
                        type: "darken",
                        value: 1,
                    },
                },
            },
            stroke: {
                show: true,
                width: 0,
                colors: ["transparent"],
            },
            grid: {
                show: false,
                strokeDashArray: 4,
                padding: {
                    left: 2,
                    right: 2,
                    top: -14
                },
            },
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false,
            },
            xaxis: {
                floating: false,
                labels: {
                    show: true,
                    style: {
                        fontFamily: "Inter, sans-serif",
                        cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                    }
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
        }
        return options;
    }


}
