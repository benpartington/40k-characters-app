import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import {BattleSelectorComponent} from './battle-selector/battle-selector.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'
    }
    ,
    {
        path: 'battle',
        component: BattleSelectorComponent,
        title: 'Battle Selector'
    }
];

export default routeConfig;