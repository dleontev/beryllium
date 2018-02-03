defmodule BackendWeb.Notification do
    #use DynamicSupervisor

    def start_link() do
        #IO.puts("IM STARTING")
        DynamicSupervisor.start_link(__MODULE__, nil, name: __MODULE__)
    end

    def start_child(discussion_id, amount) do
        spec = Supervisor.child_spec({Agent, fn -> amount end}, id: discussion_id)
        {:ok, pid} = DynamicSupervisor.start_child(__MODULE__, spec)
        Process.register(pid, discussion_id)
    end

    def init(_arg) do
        DynamicSupervisor.init(strategy: :one_for_one)
    end
end