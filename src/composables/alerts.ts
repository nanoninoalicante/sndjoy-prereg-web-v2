import { computed, ref } from "vue";
import * as uuid from "uuid";

type AlertTypes = "warning" | "success" | "error";
type CloseTypes = "auto" | "manual";

const alerts: any = ref([]);
const addAlert = (data: {
    id?: string;
    message: string;
    type?: AlertTypes;
    close?: CloseTypes;
}) => {
    const alertId = data.id || uuid.v4();
    console.log("adding alert: ", alertId);
    alerts.value.push({
        message: data.message,
        type: data.type || "error",
        close: data.close || "auto",
        id: alertId,
    });
};
const removeAlert = (id: string) => {
    console.log("remove alert: ", id);
    alerts.value = alerts.value.filter((alert) => {
        return alert.id !== id;
    });
};
export function useAlerts() {
    return {
        alerts,
        addAlert,
        removeAlert,
    };
}
