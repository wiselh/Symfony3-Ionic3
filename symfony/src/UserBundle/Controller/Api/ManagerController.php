<?php

namespace UserBundle\Controller\Api;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use UserBundle\Entity\User;

class ManagerController extends Controller
{

    /**
     * @Route("/api/users",name="api_users")
     * @Method({"GET"})
     */
    public function getUsers()
    {
        $users=$this->getDoctrine()->getRepository(User::class)->findAll();
        $data=$this->get('jms_serializer')->serialize($users,'json');
        return new JsonResponse(json_decode($data),200);
    }

/**
     * @Route("/api/users/{id}",name="api_user")
     * @Method({"GET"})
     */
    public function selectedUser($id)
    {
        $users=$this->getDoctrine()->getRepository(User::class)->find($id);
        $data=$this->get('jms_serializer')->serialize($users,'json');

        return new JsonResponse(json_decode($data),200);
    }

    /**
     * @param Request $request
     * @param $id
     * @Route("/api/users/{id}",name="api_update")
     * @Method({"PUT"})
     * @return JsonResponse
     */
    public function updateUser(Request $request,$id,UserPasswordEncoderInterface $encoder)
    {

        $user=$this->getDoctrine()->getRepository(User::class)->find($id);


        $body=$request->getContent();
        $data=$this->get('jms_serializer')->deserialize($body,User::class,'json');

        $user->setFirstname($data->getFirstname());
        $user->setLastname($data->getlastname());
        $user->setUsername($data->getUsername());
        $user->setEmail($data->getEmail());
        $user->setPassword($encoder->encodePassword($user,$data->getPassword()));
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();

        $response=array(
            'code'=>0,
            'message'=>'User updated!',
            'errors'=>null,
            'result'=>null

        );
        return new JsonResponse($response,200);
    }

    /**
     * @Route("/api/users/{id}",name="api_delete")
     * @Method({"DELETE"})
     */
    public function deleteUser($id)
    {

        $user=$this->getDoctrine()->getRepository(User::class)->find($id);

        $em=$this->getDoctrine()->getManager();
        $em->remove($user);
        $em->flush();

        $response=array(

            'code'=>0,
            'message'=>'user deleted !',
            'errors'=>null,
            'result'=>null

        );
        return new JsonResponse($response,200);
    }
}
