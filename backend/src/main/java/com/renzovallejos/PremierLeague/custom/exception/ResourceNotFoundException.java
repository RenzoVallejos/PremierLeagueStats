package com.renzovallejos.PremierLeague.custom;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        System.out.println(message);
    }

}
