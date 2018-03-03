defmodule Backend.Auth.Answer do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Answer

  @primary_key {:id, :binary_id, autogenerate: true}
  schema "answers" do
    field(:question_id, :binary_id, null: false)
    field(:submission_id, :binary_id, null: false)
    field(:selected_field, :string, null: false)
  end

  @doc false
  def changeset(%Answer{} = answer, attrs) do
    answer
    |> cast(attrs, [:id, :question_id, :submission_id, :selected_field])
    |> validate_required([:id, :question_id, :submission_id, :selected_field])
  end
end
