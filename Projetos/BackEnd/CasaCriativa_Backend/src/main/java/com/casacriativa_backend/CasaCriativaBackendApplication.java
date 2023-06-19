package com.casacriativa_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.reactive.ReactiveSecurityAutoConfiguration;

@SpringBootApplication
public class CasaCriativaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(CasaCriativaBackendApplication.class, args);
    }

}
