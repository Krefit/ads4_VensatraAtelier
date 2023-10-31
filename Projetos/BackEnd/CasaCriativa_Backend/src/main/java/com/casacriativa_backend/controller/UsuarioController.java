package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Usuario;
import com.casacriativa_backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> get() {
        return usuarioService.listarUsuario();
    }

    @PostMapping
    public void createUsuario(@RequestBody Usuario usuario) {
        usuarioService.createUsuario(usuario);
    }

    @PutMapping("/{id}")
    public void updateUsuario(@PathVariable("id") Integer id, @RequestBody Usuario usuario) {
        usuarioService.updateUsuario(id, usuario);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id) {
        usuarioService.deleteUsuario(id);
    }
}
