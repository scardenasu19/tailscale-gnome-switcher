import Clutter from 'gi://Clutter';
import Gio from 'gi://Gio';
import GObject from 'gi://GObject';
import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

const TailscaleSwitcher = GObject.registerClass(
class TailscaleSwitcher extends PanelMenu.Button {
    _init() {
        super._init(0.5, 'Tailscale Switcher');

        // Crear el icono de red en la barra superior
        let icon = new St.Icon({
            gicon: new Gio.ThemedIcon({ name: 'network-vpn-symbolic' }),
            style_class: 'system-status-icon'
        });
        this.add_child(icon);

        // Opción 1: Red Corporativa / Principal
        let itemEmpresaA = new PopupMenu.PopupMenuItem('🌐 Red Principal');
        itemEmpresaA.connect('activate', () => {
            this._runCommand(['tailscale', 'switch', 'mi-red-principal']);
        });
        this.menu.addMenuItem(itemEmpresaA);

        // Opción 2: Red Secundaria / Cliente
        let itemEmpresaB = new PopupMenu.PopupMenuItem('🏢 Red Secundaria');
        itemEmpresaB.connect('activate', () => {
            this._runCommand(['tailscale', 'switch', 'mi-red-secundaria']);
        });
        this.menu.addMenuItem(itemEmpresaB);
    }

    _runCommand(argv) {
        try {
            let proc = Gio.Subprocess.new(argv, Gio.SubprocessFlags.NONE);
            proc.init(null);
            Main.notify('Tailscale', 'Cambiando de red...');
        } catch (e) {
            logError(e);
        }
    }
});

export default class TailscaleSwitcherExtension {
    enable() {
        this._indicator = new TailscaleSwitcher();
        Main.panel.addToStatusArea('tailscale-switcher', this._indicator);
    }

    disable() {
        this._indicator.destroy();
        this._indicator = null;
    }
}
