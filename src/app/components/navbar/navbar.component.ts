import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { AppTheme, ThemeService } from 'src/app/services/theme';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule, RouterModule, LogoComponent],
    templateUrl: './navbar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
    private readonly _router = inject(Router);

    private readonly _themeService = inject(ThemeService);

    currentTheme!: AppTheme | null;

    // private visibleBloc:string = 'invisible';

    private readonly _destroy$ = new Subject();

    visibleBlocField: boolean = false;
    
    ngOnInit(): void {
        this._themeService.currentTheme$
            .pipe(takeUntil(this._destroy$))
            .subscribe((theme) => (this.currentTheme = theme));
    }

    ngOnDestroy(): void {
        this._destroy$.complete();
        this._destroy$.unsubscribe();
    }
    
    handleThemeChange(theme: AppTheme): void {
        this._themeService.setTheme(theme);
        this.closeDropdown();
    }

    togleDropdown(): void {
        // this.visibleBloc = "visible";
        this.visibleBlocField = !this.visibleBlocField;
    }

    closeDropdown(): void {
        // this.visibleBloc = "invisible";\
        this.visibleBlocField = false;
    }

    getCurrentTheme(): void{
        this._themeService.currentTheme;
        
    }
    
}
