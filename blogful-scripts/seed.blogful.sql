insert into blogful_articles (title, date_published, content)
VALUES
  ('Article 1', now() - '9 days'::interval, 'Content for article 1'),
  ('Article 2', now() - '8 days'::interval, 'Content for article 2'),
  ('Article 3', now() - '7 days'::interval, 'Content for article 3'),
  ('Article 4', now() - '6 days'::interval, 'Content for article 4'),
  ('Article 5', now() - '5 days'::interval, 'Content for article 5'),
  ('Article 6', now() - '4 days'::interval, 'Content for article 6'),
  ('Article 7', now() - '3 days'::interval, 'Content for article 7'),
  ('Article 8', now() - '2 days'::interval, 'Content for article 8'),
  ('Article 9', now() - '1 days'::interval, 'Content for article 9'),
  ('Article 10', now(), 'Content for article 10')
;
