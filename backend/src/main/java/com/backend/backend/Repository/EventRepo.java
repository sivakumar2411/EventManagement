package com.backend.backend.Repository;

import java.util.List;

// import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.backend.Model.Event;

@Repository
public interface EventRepo extends JpaRepository<Event,Integer>
{
    Event findById(int id);

    @Query("select E from Event E where E.publicevent = true")
    List<Event> getPublicEvents();

    @Query("select E from Event E where lower(:a) = lower(concat('%',:b,'%'))")
    List<Event> getByAttribute(String a,String b);

    // @Query("select E from Event E where E.status = :a")
    // List<Event> getByStatus(String a);

    @Query("Select E from Event E where E.manager.id = :id")
    List<Event> getEventsByManager(int id);

    
    @Query("Select E from Event E where E.fee <= :a")
    List<Event> getEventsByFee(double a);
    
}
