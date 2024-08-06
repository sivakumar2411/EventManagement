package com.backend.backend.Model;

import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class User 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String uname,email,gender = "Male",region = "Asia";
    private String password;

    @Lob
    private String profImg = "";

    private boolean admin = false,mana = false;

    @OneToOne(cascade = CascadeType.ALL)
    private Manager manager;
    
    @OneToMany(mappedBy = "organiser",cascade = CascadeType.ALL)
    private List<Event> eventsOrganised;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Notification> notifications;

}
