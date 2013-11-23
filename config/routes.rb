Progress::Application.routes.draw do
  root to: 'roots#show'

  scope '/auth' do
    get '/:provider/callback' => 'sessions#create'
    get '/failure'            => 'sessions#fail'
  end

  get '/login' => 'sessions#new', as: :login
  delete '/logout' => 'sessions#destroy', as: :logout

  namespace 'api' do
    namespace 'v1' do
      resources :boards, only: [:index, :create, :destroy]
      resources :cards, only: [:create, :destroy]
      resources :lists, only: [:create, :destroy]
    end
  end
end