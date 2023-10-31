package com.casacriativa_backend.service;

import com.casacriativa_backend.model.Usuario;
import com.casacriativa_backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarUsuario(){
        return usuarioRepository.findAll();
    }

    public void createUsuario(Usuario usuario){
        usuarioRepository.save(usuario);
    }

    public void updateUsuario(Integer id, Usuario usuario){
        Optional<Usuario> usuarioFoundOptional = usuarioRepository.findById(id);
        if (usuarioFoundOptional.isPresent()){
            Usuario recordFound = usuarioFoundOptional.get();
            recordFound.setNome(usuario.getNome());
            recordFound.setEmail(usuario.getEmail());
            recordFound.setLogin(usuario.getLogin());

            usuarioRepository.save(recordFound);
        }
    }
    public void deleteUsuario(Integer id){
        usuarioRepository.deleteById(id);
    }

}
