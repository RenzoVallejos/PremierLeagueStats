package com.renzovallejos.PremierLeague.custom.exception;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        System.out.println(message);
    }

}
