package com.renzovallejos.PremierLeague.player;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        System.out.println(message);
    }

}
