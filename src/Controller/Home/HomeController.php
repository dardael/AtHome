<?php
declare(strict_types = 1);
namespace App\Controller\Home;

use App\Controller\Core\GenericController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends GenericController
{
    #[Route('/home', name: 'home')]
    public function display(
        Request $request
    ): Response {
        return $this->redirectToRoute('outdoor_greenSpace_encyclopedia');
    }
}
