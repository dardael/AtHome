<?php
declare(strict_types = 1);
//src/Controller/Security/IdentificationController.php
namespace App\Controller\Security;

use App\Controller\Core\GenericController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IdentificationController extends GenericController
{
    #[Route('/', name: 'identification')]
    public function display(Request $request): Response
    {
        return $this->getRenderResponse(
            'authenticatePage',
            []
        );
    }
}
