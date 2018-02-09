defmodule Backend.Auth.Assignment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Backend.Auth.Assignment

  @primary_key {:id, :binary_id, autogenerate: false}
  schema "assignments" do
    field(:section_id, :binary_id, null: false)
    field(:due_at, :naive_datetime, null: false)
    field(:type, :integer, null: false)
    field(:content, :string, null: false)
    field(:is_published, :boolean)
    field(:points_possible, :integer, null: false)
  end

  @doc false
  def changeset(%Assignment{} = assignment, attrs) do
    assignment
    |> cast(attrs, [:id, :section_id, :due_at, :type, :content, :is_published, :points_possible])
    |> validate_required([:id, :section_id, :content])
  end
end
