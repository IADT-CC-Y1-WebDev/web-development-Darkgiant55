<?php

class Format {
    public $id;
    public $name;
    public $manufacturer;

    private $db;

    public function __construct($data = []) {
        $this->db = DB::getInstance()->getConnection();

        if (!empty($data)) {
            $this->id = $data['id'] ?? null;
            $this->name = $data['name'] ?? null;
            $this->manufacturer = $data['manufacturer'] ?? null;
        }
    }

    // Find all format
    public static function findAll() {
        $db = DB::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT * FROM format ORDER BY name");
        $stmt->execute();

        $format = [];
        while ($row = $stmt->fetch()) {
            $format[] = new Format($row);
        }

        return $format;
    }

    // Find format by ID
    public static function findById($id) {
        $db = DB::getInstance()->getConnection();
        $stmt = $db->prepare("SELECT * FROM format WHERE id = :id");
        $stmt->execute(['id' => $id]);

        $row = $stmt->fetch();
        if ($row) {
            return new Format($row);
        }

        return null;
    }

    // Find format by book (requires JOIN with book_format table)
    public static function findByBook($bookId) {
        $db = DB::getInstance()->getConnection();
        $stmt = $db->prepare("
            SELECT p.*
            FROM format p
            INNER JOIN book_format gp ON p.id = gp.format_id
            WHERE gp.book_id = :book_id
            ORDER BY p.name
        ");
        $stmt->execute(['book_id' => $bookId]);

        $format = [];
        while ($row = $stmt->fetch()) {
            $format[] = new Format($row);
        }

        return $format;
    }
    
    // Convert to array for JSON output
    public function toArray() {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'manufacturer' => $this->manufacturer
        ];
    }
}
