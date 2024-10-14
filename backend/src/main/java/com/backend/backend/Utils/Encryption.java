package com.backend.backend.Utils;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Encryption 
{
    private final StandardPBEStringEncryptor encryptor;

    public Encryption(@Value("${jasypt.encryptor.password}") String pw)
    {
        this.encryptor = new StandardPBEStringEncryptor();
        this.encryptor.setPassword(pw);
    }

    public String encrypt(String text)
    {
        return encryptor.encrypt(text);
    }

    public String decrypt(String encryptedText)
    {
        return encryptor.decrypt(encryptedText);
    }
}
