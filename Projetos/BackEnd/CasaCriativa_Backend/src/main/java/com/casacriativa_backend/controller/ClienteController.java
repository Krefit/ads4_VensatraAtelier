package com.casacriativa_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.casacriativa_backend.model.Cliente;
import com.casacriativa_backend.service.ClienteService;

@RestController
@RequestMapping(value = "/api/cliente")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/read")
    public List<Cliente> listarCliente() {
        return clienteService.listarCliente();
    }

    @PostMapping("/create")
    public void createCLiente(@RequestBody Cliente cliente) {
        clienteService.createCLiente(cliente);
    }

    @PutMapping("/update/{id}")
    public void editarCliente(@PathVariable("id") Integer id, @RequestBody Cliente cliente) {
        clienteService.editarCliente(id, cliente);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCliente(@PathVariable("id") Integer id) {
        clienteService.deleteCliente(id);
    }
}


