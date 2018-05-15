<?php

namespace UserBundle\Controller\Api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use UserBundle\Entity\User;




class RegisterController extends Controller
{

    /**
     * @Route("/app/register" , name="api_register")
     * @Method("POST")
     */
    public function registerAction(Request $request,UserPasswordEncoderInterface $encoder)
    {
        $data=$request->getContent();
        $user=$this->get('jms_serializer')->deserialize($data,User::class,'json');

         $em=$this->getDoctrine()->getManager();
         $user->setPassword($encoder->encodePassword($user,$request->request->get('password')));

        $user->setCreatedAt(new \DateTime("now"));

        $em->persist($user);
         $em->flush();
        $response=array(

            'code'=>1,
            'message'=>'User created!',
            'errors'=>null,
            'result'=>null
        );
        // json_decode($user->getPassword()),
        return new JsonResponse($response,Response::HTTP_CREATED);

    }

    /**
     * @Route("/api/logout" ,name="api_logout")
     */
    public function logoutAction(){}

}
