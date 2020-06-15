package com.connellboyce.peppergarden.repository;

import java.util.List;

public interface BlogOperations {
    List<String> findTagsByFragment(String fragment);
    List<String> findAllTags();
}
