package me.send.model.repository;

import me.send.model.File;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends CrudRepository<File, Integer> {
    // Récuperer la liste des fichiers pour un user id
    Iterable<File> findBySenderId(Integer senderId);
}
