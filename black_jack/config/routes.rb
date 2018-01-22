Rails.application.routes.draw do
  root :to => 'welcome#index'

  get "/rooms", to: "rooms#show"

  post "/login", to: "sessions#create"

  resources :users, only: [ :create, :show ]

  mount ActionCable.server => "/cable"
end
