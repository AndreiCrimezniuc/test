<?php

namespace App\Services;

class BaseService {
    protected $model;
// методы для упрощения работы с CRUD
    public function create($data) {
        return $this->model->create($data);
    }

    public function read($filters = []) { //параметр для фильтрации
        return $this->model::where($filters)->get();
    }

    public function get($id, $slug, $load = []) {
        if ($slug) {
            $item = $this->model::where("slug", $id)->with($load)->firstOrFail(); //загрузка зависимостей через with - полезно для производительности
        } else {
            $item = $this->model::findOrFail($id);
        }
        return $item;
    }

    public function update ($id, $data) {
        $item = $this->model->findOrFail($id);
        $item->update($data);
    }

    public function delete($id) {
        $item = $this->model->findOrFail($id);
        $item->delete();
    }
}