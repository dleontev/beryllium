defmodule Backend.Repo.Migrations.CreateQuizzes do
  use Ecto.Migration

  def change do
    create table(:quizzes) do

      timestamps()
    end

  end
end
