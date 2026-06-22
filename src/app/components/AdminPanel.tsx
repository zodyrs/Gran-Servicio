import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import type { Lang } from "./translations";
import { translations } from "./translations";

interface Profesional {
  id: number;
  nombre: string;
  rubro: string;
  telefono: string;
  localidad: string;
  descripcion: string;
  created_at?: string;
}

interface Suscriptor {
  id?: number;
  email?: string;
  nombre?: string;
  created_at?: string;
  [key: string]: unknown;
}

interface AdminPanelProps {
  lang: Lang;
}

export function AdminPanel({ lang }: AdminPanelProps) {
  const t = translations[lang].admin;
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [suscriptores, setSuscriptores] = useState<Suscriptor[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorProfesionales, setErrorProfesionales] = useState<string | null>(null);
  const [errorSuscriptores, setErrorSuscriptores] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setErrorProfesionales(null);
      setErrorSuscriptores(null);

      const [profesionalesRes, suscriptoresRes] = await Promise.all([
        supabase.from("profesionales").select("*").order("created_at", { ascending: false }),
        supabase.from("suscriptores").select("*").order("created_at", { ascending: false }),
      ]);

      if (profesionalesRes.error) {
        setErrorProfesionales(profesionalesRes.error.message);
      } else if (profesionalesRes.data) {
        setProfesionales(profesionalesRes.data as Profesional[]);
      }

      if (suscriptoresRes.error) {
        setErrorSuscriptores(suscriptoresRes.error.message);
      } else if (suscriptoresRes.data) {
        setSuscriptores(suscriptoresRes.data as Suscriptor[]);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const suscriptorColumns = suscriptores.length > 0 ? Object.keys(suscriptores[0]) : [];

  return (
    <section id="admin" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto bg-background/80 rounded-3xl border border-border">
      <div className="flex flex-col gap-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted text-xs text-muted-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
          {t.title}
        </div>
        <h2 className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
          {t.subtitle}
        </h2>
        <p className="text-muted-foreground max-w-2xl">{t.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">{t.cards.professionals}</p>
          <p className="mt-3 text-4xl font-semibold text-foreground">{profesionales.length}</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">{t.cards.subscribers}</p>
          <p className="mt-3 text-4xl font-semibold text-foreground">{suscriptores.length}</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">{t.cards.authUsers}</p>
          <p className="mt-3 text-4xl font-semibold text-foreground">{t.notAvailable}</p>
        </div>
      </div>

      {loading && (
        <div className="text-center py-12 text-muted-foreground">{t.loading}</div>
      )}

      {errorProfesionales && (
        <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-red-700 text-sm">
          {t.professionalsError}: {errorProfesionales}
        </div>
      )}

      {!loading && profesionales.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-foreground mb-4">{t.professionalsTableTitle}</h3>
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="min-w-full text-left text-sm text-muted-foreground">
              <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Rubro</th>
                  <th className="px-4 py-3">Teléfono</th>
                  <th className="px-4 py-3">Localidad</th>
                  <th className="px-4 py-3">Creado</th>
                </tr>
              </thead>
              <tbody>
                {profesionales.map((prof) => (
                  <tr key={prof.id} className="border-b border-border hover:bg-muted/50">
                    <td className="px-4 py-3 text-xs text-muted-foreground">{prof.id}</td>
                    <td className="px-4 py-3 text-foreground">{prof.nombre}</td>
                    <td className="px-4 py-3 text-foreground">{prof.rubro}</td>
                    <td className="px-4 py-3 text-foreground">{prof.telefono}</td>
                    <td className="px-4 py-3 text-foreground">{prof.localidad}</td>
                    <td className="px-4 py-3 text-foreground">{prof.created_at || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h3 className="text-xl font-semibold text-foreground">{t.subscribersTableTitle}</h3>
          {errorSuscriptores && <span className="text-sm text-red-400">{t.subscribersError}</span>}
        </div>
        {suscriptores.length > 0 ? (
          <div className="overflow-x-auto rounded-3xl border border-border bg-card">
            <table className="min-w-full text-left text-sm text-muted-foreground">
              <thead className="border-b border-border bg-muted text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  {suscriptorColumns.map((column) => (
                    <th key={column} className="px-4 py-3">{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {suscriptores.map((suscriptor, index) => (
                  <tr key={suscriptor.id ?? index} className="border-b border-border hover:bg-muted/50">
                    {suscriptorColumns.map((column) => (
                      <td key={column} className="px-4 py-3 text-foreground">{String(suscriptor[column] ?? "-")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-card p-6 text-sm text-muted-foreground">
            {errorSuscriptores ? t.subscribersNotFound : t.subscribersEmpty}
          </div>
        )}
      </div>
    </section>
  );
}
