<?php

namespace App\Document\Outdoor\GreenSpace\Encyclopedia\Plant;

enum Type: string
{
    case TREE = 'tree';
    case SHRUB = 'shrub';
    case ORNAMENTAL_PLANT = 'ornamentalPlant';
    case AROMATIC = 'aromatic';
    case POND_PLANT = 'pondPlant';
}
