<?php
declare(strict_types = 1);
//src/Controller/Security/IdentificationController.php
namespace App\Controller\Security;

use App\Controller\Core\GenericController;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
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

    #[Route('/account/creation', name: 'account_creation')]
    public function getAccountCreationPage(Request $request): Response
    {
        return $this->getRenderResponse(
            'accountCreationPage',
            []
        );
    }

    #[Route('/account/create', name: 'account_create', methods: ['POST'])]
    public function createAccount(
        DocumentManager $documentManager,
        UserPasswordHasherInterface $passwordHasher,
        Request $request
    ): Response
    {
        //return $this->redirectToRoute('account_creation');
        $user = new User();
        $user->setEmail($request->request->get('email'));
        $user->setPassword(
            $passwordHasher->hashPassword($user, $request->request->get('password'))
        );
        $documentManager->persist($user);
        $documentManager->flush();
        return new Response();
    }
}
