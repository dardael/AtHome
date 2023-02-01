<?php
declare(strict_types = 1);
namespace App\Controller\Outdoor\GreenSpace\Encyclopedia;

use App\Controller\Core\GenericController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Plant extends GenericController
{
    #[Route('/outdoor/green-space/encyclopedia/plant/save')]
    public function save(
        Request $request
    ): Response {

    }
}
