Una extensión ligera y nativa para GNOME (Ubuntu) que permite alternar rápidamente entre las redes Tailscale directamente desde la barra superior.

## 🛠️ Requisitos Previos

Para que la extensión pueda cambiar de red sin necesidad de pedir contraseñas de administrador (`sudo`) de forma gráfica, debes autorizar a tu usuario local como operador de Tailscale.
cat << 'EOF' > ~/Documentos/GitHub/tailscale-gnome-switcher/metadata.json
{
  "uuid": "tailscale-switcher@generic.extension",
  "name": "Selector Tailscale",
  "description": "Alternar rápidamente entre las redes Tailscale",
  "shell-version": [ "45", "46", "47" ],
  "url": ""
}
