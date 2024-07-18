import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User, WorkOut } from 'src/app/models';
import { LocalstorageService } from 'src/app/services';

@Component({
    standalone: true,
    imports: [CommonModule],
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

}
