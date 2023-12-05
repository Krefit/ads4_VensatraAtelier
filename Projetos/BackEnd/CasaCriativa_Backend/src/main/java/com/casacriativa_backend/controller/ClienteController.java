package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Cliente;
import com.casacriativa_backend.service.ClienteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/cliente")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> listarCliente() {
        return clienteService.listarCliente();
    }

    @PostMapping
    public void createCLiente(@RequestBody Cliente cliente) {
        clienteService.createCLiente(cliente);
    }

    @PutMapping("/{id}")
    public void editarCliente(@PathVariable("id") Integer id, @RequestBody Cliente cliente) {
        clienteService.editarCliente(id, cliente);
    }

    @DeleteMapping("/{id}")
    public void deleteCliente(@PathVariable("id") Integer id) {
        clienteService.deleteCliente(id);
    }
}


