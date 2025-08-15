
import AdminLayout from "@/components/admin/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPages() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gerenciar Páginas</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Nova Página
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Funcionalidade em Desenvolvimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Esta seção permitirá o gerenciamento de páginas estáticas do site, como:
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Edição de conteúdo da página Filosofia</li>
              <li>• Customização das páginas de Jornadas</li>
              <li>• Gerenciamento do conteúdo do Estudo de Caso</li>
              <li>• Configuração de meta tags por página</li>
            </ul>
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Status: Em breve</p>
              <p className="text-xs text-muted-foreground mt-1">
                A funcionalidade completa será implementada na próxima fase do projeto.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
