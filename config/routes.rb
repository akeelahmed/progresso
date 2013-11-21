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
    end
  end
end