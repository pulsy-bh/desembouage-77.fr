source "https://rubygems.org"

# Pour GitHub Pages : utilise leur gem packagée
gem "github-pages", group: :jekyll_plugins

group :jekyll_plugins do
  gem 'jekyll-sitemap'
  gem 'jekyll-minifier'
  gem 'html-proofer'
  gem 'jekyll_picture_tag'
end

install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?
