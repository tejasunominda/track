# trackforge-search-service

Extractable service candidate (Phase 2, see Technical Architecture Document §2.1 and
Feature Ticket [F11-01]/[F11-02]). Wraps Elasticsearch/OpenSearch indexing (via Kafka
consumer from the core API's domain events) and serves TQL query execution.

Not required for MVP — `trackforge-api` implements basic Postgres full-text search
in-process until this service is stood up (see [F10-03]).
