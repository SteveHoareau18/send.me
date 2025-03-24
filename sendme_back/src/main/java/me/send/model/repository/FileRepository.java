package me.send.model.repository;

import me.send.model.File;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends CrudRepository<File, Integer> {
    Iterable<File> findBySenderId(Integer senderId);

    @Query("SELECT f FROM File f WHERE f.filePath LIKE %:filePath%")
    File findByFilePathLike(@Param("filePath") String filePath);
}
