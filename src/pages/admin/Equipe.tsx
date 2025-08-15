
import AdminLayout from "@/components/admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Plus, UserCheck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminEquipe() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Equipe</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Convidar Membro
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Membros da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Gerencie usuários com acesso ao portal administrativo.
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Administrador</p>
                      <p className="text-xs text-muted-foreground">Acesso total</p>
                    </div>
                  </div>
                  <UserCheck className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funcionalidade em Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Esta seção permitirá:
              </p>
              <ul className="space-y-2 text-sm">
                <li>• Convidar novos membros da equipe</li>
                <li>• Gerenciar permissões e roles</li>
                <li>• Controlar acesso às diferentes seções</li>
                <li>• Histórico de atividades dos usuários</li>
              </ul>
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium">Status: Em breve</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Sistema completo de gestão de usuários será implementado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
