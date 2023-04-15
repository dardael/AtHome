<?php
declare(strict_types=1);
namespace App\Controller\Account;

use App\Controller\Core\GenericController;
use App\Document\Home\MenuItem;
use App\Document\Outdoor\GreenSpace\Encyclopedia as EncyclopediaDocument;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccountAdmin extends GenericController
{
    #[Route('/account/admin/display', name: 'account_admin_display')]
    public function display(): Response
    {
        return $this->getRenderResponse('homePage', [
            'menuItem' => MenuItem::ACCOUNT_ADMIN,
        ]);
    }
}
