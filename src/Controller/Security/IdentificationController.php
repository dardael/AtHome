<?php
declare(strict_types = 1);
//src/Controller/Security/IdentificationController.php
namespace App\Controller\Security;

use App\Controller\Core\GenericController;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;
use Symfony\Component\HttpFoundation\JsonResponse;
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
            ['fromAccountCreation' => $request->query->has('fromAccountCreation')]
        );
    }

    #[Route('/account/creation', name: 'account_creation')]
    public function getAccountCreationPage(Request $request): Response
    {
        return $this->getRenderResponse(
            'accountCreationPage'
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

        $existingUser = $documentManager->getRepository(User::class)
            ->findOneBy(['email' => $user->getUserIdentifier()]);
        if ($existingUser) {
            return new JsonResponse([
                'success' => false,
                'message' => 'Un utilisateur avec cet mail existe déjà'
            ]);
        }
        $documentManager->persist($user);
        $documentManager->flush();
        return new JsonResponse(['success' => true]);
    }
}
