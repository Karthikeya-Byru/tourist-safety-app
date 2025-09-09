class Incident {
  final String id;
  final String type;
  final String description;
  final String location;
  final double latitude;
  final double longitude;
  final String status;
  final String severity;
  final DateTime reportedAt;
  final String reportedBy;

  Incident({
    required this.id,
    required this.type,
    required this.description,
    required this.location,
    required this.latitude,
    required this.longitude,
    required this.status,
    required this.severity,
    required this.reportedAt,
    required this.reportedBy,
  });

  factory Incident.fromJson(Map<String, dynamic> json) {
    return Incident(
      id: json['_id'] ?? json['id'] ?? '',
      type: json['type'] ?? '',
      description: json['description'] ?? '',
      location: json['location'] ?? '',
      latitude: (json['latitude'] ?? 0.0).toDouble(),
      longitude: (json['longitude'] ?? 0.0).toDouble(),
      status: json['status'] ?? 'pending',
      severity: json['severity'] ?? 'medium',
      reportedAt: DateTime.parse(json['reportedAt'] ?? DateTime.now().toIso8601String()),
      reportedBy: json['reportedBy'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'type': type,
      'description': description,
      'location': location,
      'latitude': latitude,
      'longitude': longitude,
      'status': status,
      'severity': severity,
      'reportedAt': reportedAt.toIso8601String(),
      'reportedBy': reportedBy,
    };
  }
}
