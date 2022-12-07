<?php
declare(strict_types = 1);
namespace App\Controller\Security;

use App\Controller\Core\GenericController;
use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class IdentificationController extends GenericController
{
    #[Route('/', name: 'identification')]
    public function display(
        AuthenticationUtils $authenticationUtils,
        Security $security,
        Request $request
    ): Response {
        if ($security->getUser()) {
            return $this->redirectToRoute('home');
        }

        return $this->getRenderResponse(
            'authenticatePage',
            [
                'fromAccountCreation' => $request->query->has('fromAccountCreation'),
                'hasLoggingError' => !empty($authenticationUtils->getLastAuthenticationError()?->getMessage()),
            ]
        );
    }

    #[Route('/authenticate', name: 'authenticate')]
    public function authenticate(): void {
    }

    #[Route('/account/creation', name: 'account_creation')]
    public function getAccountCreationPage(Request $request): Response
    {
        return $this->getRenderResponse(
            'accountCreationPage',
            ['userAlreadyExists' => $request->query->has('userAlreadyExists')]
        );
    }

    #[Route('/account/create', name: 'account_create')]
    public function createAccount(
        DocumentManager $documentManager,
        UserPasswordHasherInterface $passwordHasher,
        Request $request
    ): Response
    {
        $user = new User();
        $user->setEmail($request->query->get('email'));
        $user->setPassword(
            $passwordHasher->hashPassword($user, $request->query->get('password'))
        );

        $existingUser = $documentManager->getRepository(User::class)
            ->findOneBy(['email' => $user->getUserIdentifier()]);
        if ($existingUser) {
          return $this->redirectToRoute('account_creation', [
                'userAlreadyExists' => true,
            ]);
        }
        $documentManager->persist($user);
        $documentManager->flush();
        return $this->redirectToRoute('identification', [
            'fromAccountCreation' => true
        ]);
    }
}
